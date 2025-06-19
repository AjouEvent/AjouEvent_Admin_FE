// SubjectSelect.jsx
import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LuSearch } from "react-icons/lu";
export default function SubjectSelect({
                                          subjectId,
                                          setSubjectId,
                                          subjects,
                                          width = "w-[120px]",
                                          disabled = false,
                                          placeholder = "카테고리"
                                      }) {
    const [searchTerm, setSearchTerm] = useState("");

    const selectOptions = subjects.map(s => ({
        value: s.id.toString(),
        label: s.name,
    }));

    // 검색 필터
    const filteredOptions = selectOptions.filter((s) =>
        s.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Select value={subjectId} onValueChange={setSubjectId} disabled={disabled}>
            <SelectTrigger className={width}>
                {selectOptions.find((s) => s.value === subjectId)?.label || placeholder}
            </SelectTrigger>
            <SelectContent>
                <div className="px-3 pt-2 pb-1 sticky top-0 z-10 flex items-center gap-2 bg-transparent border-0 focus-within:ring-0">
                    <LuSearch className="w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="카테고리 검색..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="h-5 border-none outline-none shadow-none focus:ring-0 focus:border-0 bg-transparent text-sm px-0"
                        style={{ boxShadow: 'none', border: 'none', background: 'transparent' }}
                    />
                </div>
                <Separator className="my-2" />
                {filteredOptions.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-muted-foreground">검색 결과 없음</div>
                ) : (
                    filteredOptions.map((s) => (
                        <SelectItem key={s.value} value={s.value} className="justify-start items-start ">
                            <span className="font-medium">{s.label}</span>
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    );
}
