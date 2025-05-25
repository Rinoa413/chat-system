import React,{ useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function ShowComment() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'board'), orderBy('time','desc'));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc,index) => ({
                    id: doc.id,
                    number: index + 1,
                    ...doc.data()
                }));
                console.log("取得データ",data);
                setComments(data);
            }catch (error) {
                console.error('データ取得にエラーが出ました。',error);
            }
        };

        fetchData();
    },[]);

    return (
        <div className="comment-area">
            {comments.length === 0 ? (
                <p>コメントはまだありません。</p>
        ) : (
        comments.map((item, index) => (
            <div className={`comment-card ${index % 2 === 0 ? 'even' : 'odd'}`} key={item.id}>
                <div style={{ display: "flex", justifyContent: "flex-start", gap: "1.5rem", marginBottom: "8px" }}>
                    <span>番号：{item.number}</span>
                    <span>名前：{item.name || '名無しさん'}</span>
                </div>
                <div>
                    <p>コメント：{item.comment}</p>
                    <p>時間： {item.time && item.time.seconds ? new Date(item.time.seconds * 1000).toLocaleString() : "不明"}</p>
                </div>
            </div>
            ))
        )}
        </div>
    );
}

export default ShowComment;