import { useEffect, useState } from 'react';
import './App.css';
import PostComment from './components/PostCommet/PostComment';
import ShowComment from './components/ShowComment/ShowComment';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase/firebase';

function App() {
  const [comments, setComments] = useState([]);

    const fetchData = async () => {
        try {
            const q = query(collection(db, "board"), orderBy("time", "asc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc, index) => ({
                id: doc.id,
                number: index + 1,
                ...doc.data(),
            }));
            setComments(data);
        } catch (error) {
            console.error("データ取得にエラーが出ました。", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <>
      <PostComment onPostSuccess={fetchData} />
      <ShowComment comments={comments} />

      <div className="sakura-container">
        {Array.from({ length: 25 }).map((_, i) => {
          const size = 20 + Math.random() * 20;
          return (
            <div
              className="sakura"
              key={i}
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                width: `${size}px`,
                height: `${size}px`,
                zIndex: -1,
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}
export default App;

