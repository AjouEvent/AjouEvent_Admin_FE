import { useState, useEffect } from "react";
import ClubEventDialog from "@/components/clubEvent/ClubEventDialog.jsx";
import ClubEventCard from "@/components/clubEvent/ClubEventCard";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LuSearch } from "react-icons/lu";
import {
    fetchAllClubEvents,
    fetchVisibleClubEvents,
    fetchHiddenClubEvents,
    fetchAllSubjects,
} from "@/api/clubEvent";
import SubjectSelect from "@/components/clubEvent/SubjectSelect.jsx";
import PageContainer from "@/components/layout/PageContainer.jsx";

export default function ClubEventPage() {
    const [subjectId, setSubjectId] = useState("");      // "" = 전체
    const [visibility, setVisibility] = useState("all"); // "all" | "visible" | "hidden"
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const res = await fetchAllSubjects();
                const subjectsWithAll = [
                    { name: "전체", id: "all" },
                    ...(res.data.subjects ?? []),
                ];
                setSubjects(subjectsWithAll);
            } catch (e) {
                // 필요시 에러 처리
            }
        };
        (async () => { await loadSubjects(); })();
    }, []);

    useEffect(() => {
        (async () => {
            await fetchEvents(subjectId, visibility);
        })();
    }, [subjectId, visibility]);

    const fetchEvents = async (subjectId, visibility) => {
        setLoading(true);
        try {
            let res;
            const subjectParam = subjectId === "all" ? undefined : subjectId;
            if (visibility === "all") {
                res = await fetchAllClubEvents(subjectParam);
            } else if (visibility === "visible") {
                res = await fetchVisibleClubEvents(subjectParam);
            } else {
                res = await fetchHiddenClubEvents(subjectParam);
            }
            setEvents(res.data.events);
        } catch (e) {
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const refreshEvents = () => {
        (async () => {
            await fetchEvents(subjectId, visibility);
        }) ();
    };
    return (
        <PageContainer>
        {/*<div className="min-h-screen bg-muted flex flex-col px-4 py-8">*/}
            <div className="flex items-center justify-between gap-2 mb-7">
                <h1 className="text-2xl font-bold">Club Event Management</h1>
                <div className="flex gap-2 items-center">
                    <SubjectSelect
                        subjectId={subjectId}
                        setSubjectId={setSubjectId}
                        subjects={subjects}          // 그냥 subject 배열 주입
                        width="w-[160px]"

                    />
                    <ClubEventDialog
                        open={open}
                        setOpen={setOpen}
                        subjectList={subjects.slice(1)}
                        onAdd={refreshEvents}
                    />
                </div>
            </div>

            <RadioGroup
                className="flex flex-row gap-5 mb-3 pl-4"
                value={visibility}
                onValueChange={setVisibility}
            >
                <div className="flex items-center gap-1">
                    <RadioGroupItem value="all" id="all" />
                    <label htmlFor="all" className="text-sm">전체</label>
                </div>
                <div className="flex items-center gap-1">
                    <RadioGroupItem value="visible" id="visible" />
                    <label htmlFor="visible" className="text-sm">노출</label>
                </div>
                <div className="flex items-center gap-1">
                    <RadioGroupItem value="hidden" id="hidden" />
                    <label htmlFor="hidden" className="text-sm">숨김</label>
                </div>
            </RadioGroup>

            <Separator/>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5">
                {loading ? (
                    <div className="text-muted-foreground col-span-full text-center py-8">
                        불러오는 중...
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-muted-foreground col-span-full text-center py-8">
                        등록된 이벤트가 없습니다.
                    </div>
                ) : (
                    events.map(ev =>
                        <ClubEventCard
                            key={ev.eventId}
                            event={ev}
                            onHide={refreshEvents}
                            onShow={refreshEvents}
                        />
                    )
                )}
            </div>
        </PageContainer>
    );
}