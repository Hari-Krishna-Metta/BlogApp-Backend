// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddBlog from './components/AddBlog';
import Login from './components/Login';
import Signup from './components/Signup';
import UpdateBlog from './components/UpdateBlog';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import OpenBlog from './components/OpenBlog';
import { useState } from 'react';
import BlogState from './context/BlogState';
function App() {
  const [mode, setMode] = useState("white");
  const [modeReverse, setModeReverse] = useState("dark");
  const handleMode = () => {
    if (mode === "dark") {
      setMode("light");
      setModeReverse("dark");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    } else {
      setMode("dark");
      setModeReverse("light");
      document.body.style.backgroundColor = "#353935";
      document.body.style.color = "white";
    }
  }
  return (
    <div className="App">
      <BlogState>
      <Navbar mode={mode} modeReverse={modeReverse} handleMode={handleMode}/>
      <Routes>
      <Route exact path='/signup' element={<Signup/> } />
          <Route exact path='/login' element={<Login/> } />
          <Route exact path='/addblog' element={<AddBlog/> } />
          <Route exact path='/updateblog' element={ <UpdateBlog /> } />
          <Route exact path='/' element={<Home mode={mode} modeReverse={modeReverse} handleMode={handleMode} />} />
          <Route exact path='/openblog' element={<OpenBlog/> } />
          <Route exact path='/blogs' element={<Blogs mode={mode} modeReverse={modeReverse} handleMode={handleMode} category='all'/>} />
          <Route exact path='/art' element={<Blogs mode={mode} modeReverse={modeReverse} handleMode={handleMode} category='Art'/>} />
          <Route exact path='/entertainment' element={<Blogs mode={mode} modeReverse={modeReverse} handleMode={handleMode} category='Entertainment'/>} />
          <Route exact path='/science' element={<Blogs mode={mode} modeReverse={modeReverse} handleMode={handleMode} category='Science'/>} />
          <Route exact path='/technology' element={<Blogs  mode={mode} modeReverse={modeReverse} handleMode={handleMode} category='Technology'/>} />
          <Route exact path='/food' element={<Blogs mode={mode} modeReverse={modeReverse} handleMode={handleMode} category='Food'/>} />
          <Route exact path='/sports' element={<Blogs mode={mode} modeReverse={modeReverse} handleMode={handleMode} category='Sports'/>} />
          <Route exact path='*' element={<div style={{fontWeight:'bold',height:'100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>PAGE NOT FOUND</div>} />
      </Routes>
      </BlogState>
    </div>
  );
}

export default App;
