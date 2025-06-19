import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { hideClubEvent, unhideClubEvent } from "@/api/clubEvent";
import { useToast } from "@/hooks/use-toast";
import { BiSolidHide, BiHide } from "react-icons/bi"
import {Separator} from "@/components/ui/separator.jsx";

const EMPTY_IMAGE_URL = "/emptyImage.svg";

export default function ClubEventCard({ event, onHide, onShow }) {
    // 이미지 1장만 써도, 여러장 써도 동작하게 처리

    const { toast } = useToast();
    const [hidden, setHidden] = useState(event.hidden);
    const [loading, setLoading] = useState(false);

    const images =
        Array.isArray(event.images) && event.images.length > 0
            ? event.images
            : event.imageUrl
                ? [{ url: event.imageUrl }]
                : [];

    const handleHide = async () => {
        setLoading(true);
        try {
            await hideClubEvent(event.eventId);
            setHidden(true);
            toast({
                title: "이벤트 숨김 처리 완료",
                description: `"${event.title}" 이벤트가 숨김 처리되었습니다.`,
            });
            onHide?.();
        } catch (e) {
            toast({
                title: "숨기기 실패",
                description: "서버 오류로 숨김 처리에 실패했습니다.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // 보이기 처리
    const handleShow = async () => {
        setLoading(true);
        try {
            await unhideClubEvent(event.eventId);
            setHidden(false);
            toast({
                title: "이벤트 노출 처리 완료",
                description: `"${event.title}" 이벤트가 다시 보입니다.`,
            });
            onShow?.();
        } catch (e) {
            toast({
                title: "보이기 실패",
                description: "서버 오류로 노출 처리에 실패했습니다.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const hasValidImage = images.length > 0 && !!images[0].url;
    const [isError, setIsError] = useState(false);

    // 실제 img src
    const src = !hasValidImage || isError ? EMPTY_IMAGE_URL : images[0].url;

    const imgClass =
        hasValidImage && !isError
            ? "w-full h-60 object-cover rounded-t-2xl"
            : "w-full h-60 object-contain rounded-t-2xl";

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Card className="rounded-2xl shadow-lg hover:shadow-2xl bg-background flex flex-col p-0">
                    <div className="relative">
                        <img
                            src={src}
                            alt={event.title}
                            className={imgClass}
                            loading="lazy"
                            onError={() => setIsError(true)}
                        />
                        {/* 숨김 오버레이 */}
                        {event.hidden && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 rounded-t-2xl">
                                <span className="text-white text-xl font-bold select-none">숨김</span>
                            </div>
                        )}
                    </div>
                    <CardHeader className="pb-0">
                        <CardTitle className="truncate">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground flex-1">
                        <div className="line-clamp-2">{event.content}</div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pb-5">
                        <span className="text-xs text-gray-400">{event.createdAt}</span>
                        <span
                            className= "rounded-full px-2 py-1 text-xs font-medium bg-gray-200 text-gray-500"
                        >
                          {event.subject}
                        </span>
                    </CardFooter>
                </Card>
            </ContextMenuTrigger>
            <ContextMenuContent className=" border-0 bg-gray-100 backdrop-blur-md p-2 min-w-[160px]">
                <ContextMenuItem
                    onClick={handleHide}
                    disabled={hidden || loading}
                    className="w-full justify-between hover:bg-black/10 focus:bg-black/10 items-center py-2 px-6 rounded-md font-medium transition-all"
                >
                    <span>가리기</span>
                    <BiSolidHide className="ml-2 w-3.5 h-3.5 opacity-80" />
                </ContextMenuItem>
                <Separator className="my-0.6"/>
                <ContextMenuItem
                    onClick={handleShow}
                    disabled={!hidden || loading}
                    className="w-full justify-between hover:bg-black/10 focus:bg-black/10 items-center py-2 px-6 rounded-md font-medium transition-all"
                >
                    <span>보이기</span>
                    <BiHide className="ml-2 w-3.5 h-3.5 opacity-80" />
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
