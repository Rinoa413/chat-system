import React, { useState } from "react";
import { app } from "../../firebase/firebase";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

export const PostComment = () => {
    const db = getFirestore(app);
    const [comment, setComment] = useState('');

    const handleCloseModal = () => {
        handleShowModal(false);
    }

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
            alert("投稿の保存に成功しました。");
        } catch (error) {
            console.error("投稿保存中にエラーが発生しました:", error);
            alert("投稿の保存に失敗しました。");
        }
    };

    return (
        <>
        <div id="overlay">
            <div id="modalContent">
                <div className="modalTop">
                    <button className="cancel-btn" onClick={handleCloseModal}>キャンセル</button>
                    <button className="post-btn" onClick={pushPost} disabled={!comment}>投稿</button>
                </div>
                <div className="modalCenter">
                    {/* ここに書く */}
                    <div>
                        <label>コメント</label>
                        <textarea
                            id="commentInput"
                            placeholder="コメントを入力"
                            onChange={onChangeCommentInput}
                            value={comment}
                            rows={10} 
                        />
                    </div>
                </div>
                <div className="modalBottom">
                    {/* ここに画像選択とか、文字数とか */}
                </div>
                
            </div>
        </div>
        </>
    );
};

export default PostComment;