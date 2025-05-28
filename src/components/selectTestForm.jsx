import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";

const selecTestFrom = () => {
    return (
        <Select defaultValue="user" onValueChange={(val) => console.log("선택:", val)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="역할 선택" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="user">USER</SelectItem>
                <SelectItem value="leader">LEADER</SelectItem>
            </SelectContent>
        </Select>
    );
}
export default selecTestFrom;

