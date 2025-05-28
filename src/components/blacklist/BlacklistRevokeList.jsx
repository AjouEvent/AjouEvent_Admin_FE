// import { useEffect, useState } from "react";
// import { fetchBlacklist, removeFromBlacklist } from "@/api/blacklist.js";
// import {
//     Card, CardHeader, CardTitle, CardContent
// } from "@/components/ui/card";
//
// import {
//     AlertDialog,
//     AlertDialogTrigger,
//     AlertDialogContent,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogCancel,
//     AlertDialogAction,
// } from "@/components/ui/alert-dialog";
//
// import {
//     Table, TableHeader, TableRow, TableHead,
//     TableBody, TableCell
// } from "@/components/ui/table";
//
// import { Button } from "@/components/ui/button.jsx";
//
// const BlacklistRevokeList = () => {
//   const [blacklist, setBlacklist] = useState([]);
//
//   useEffect(() => {
//     fetchBlacklist().then((res) => setBlacklist(res.data.blacklist));
//   }, []);
//
//   const handleRevoke = async (entry) => {
//     const confirmed = window.confirm(
//       `${entry.memberName} 님을 블랙리스트에서 해지하시겠어요?`
//     );
//     if (!confirmed) return;
//
//     await removeFromBlacklist(entry.memberId);
//     setBlacklist((prev) =>
//       prev.filter((item) => item.memberId !== entry.memberId)
//     );
//   };
//
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>블랙리스트 해지</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {blacklist.length === 0 ? (
//           <p className="text-muted-foreground">등록된 블랙리스트가 없습니다.</p>
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>이름</TableHead>
//                 <TableHead>사유</TableHead>
//                 <TableHead>등록일</TableHead>
//                 <TableHead>조치</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {blacklist.map((entry) => (
//                 <TableRow key={entry.memberId}>
//                   <TableCell>{entry.memberName}</TableCell>
//                   <TableCell>{entry.reason}</TableCell>
//                   <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="destructive"
//                       onClick={() => handleRevoke(entry)}
//                     >
//                       해지
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </CardContent>
//     </Card>
//   );
// };
//
// export default BlacklistRevokeList;


import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
    Table, TableHeader, TableRow, TableHead,
    TableBody, TableCell
} from "@/components/ui/table";

import { useState, useEffect } from "react";
import { fetchBlacklist, removeFromBlacklist } from "@/api/blacklist";
import {
    Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button";

const BlacklistRevokeList = () => {
    const [blacklist, setBlacklist] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchBlacklist().then((res) => setBlacklist(res.data.blacklist));
    }, []);

    const handleRevoke = async () => {
        if (!selected) return;
        await removeFromBlacklist(selected.memberId);
        setBlacklist((prev) =>
            prev.filter((item) => item.memberId !== selected.memberId)
        );
        setSelected(null); // 다이얼로그 닫기
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>블랙리스트 해지</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>이름</TableHead>
                            <TableHead>사유</TableHead>
                            <TableHead>등록일</TableHead>
                            <TableHead>조치</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blacklist.map((entry) => (
                            <TableRow key={entry.memberId}>
                                <TableCell>{entry.memberName}</TableCell>
                                <TableCell>{entry.reason}</TableCell>
                                <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button onClick={() => setSelected(entry)}>
                                                해지
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    {selected?.memberName}님을 블랙리스트에서 해지하시겠어요?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    이 작업은 되돌릴 수 없습니다.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>취소</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleRevoke}>
                                                    해지
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default BlacklistRevokeList;
