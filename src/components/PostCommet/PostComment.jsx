import React, { useState } from "react";
import { app } from "../../firebase/firebase";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import "../PostCommet/PostComment.css"

export const PostComment = ({ onPostSuccess }) => {
    const db = getFirestore(app);
    const [comment, setComment] = useState('');

    const onChangeCommentInput = (event) => {
        setComment(event.target.value);
    };

    const pushPost = async () => {
        try {
            // Firestoreにデータを保存
            await addDoc(collection(db, "board"), {
                comment: comment,
                time: serverTimestamp(),
            });
            onPostSuccess();
        } catch (error) {
            console.error("投稿保存中にエラーが発生しました:", error);
            alert("投稿の保存に失敗しました。");
        }
    };

    return (
        <>
            <div id="modalContent">            
                <div className="modalCenter">
                    {/* ここに書く */}
                        <textarea
                            id="commentInput"
                            placeholder="コメントを入力"
                            onChange={onChangeCommentInput}
                            value={comment}
                            rows={1} 
                        />
                </div>
                <div className="modalBottom">
                    {/* ここに画像選択とか、文字数とか */}
                    <button className="post-btn" onClick={pushPost} disabled={!comment}>投稿</button>
                    
                </div>       
            </div>
        </>
    );
};

export default PostComment;
