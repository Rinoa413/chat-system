import './App.css';
import PostComment from './components/PostCommet/PostComment';
import ShowComment from './components/ShowComment/ShowComment';

function App() {
  return (
    <>
      <PostComment />
      <ShowComment />

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

