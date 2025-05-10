// Frontend Code (Manager.js)
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const [form, setForm] = useState({ site: '', username: '', password: '' });
  const ref = useRef();
  const passwordRef = useRef();
  const [passwordArray, setPasswordArray] = useState([]);
  const [editId, setEditId] = useState(null);

  const getPasswords = async () => {
    const res = await fetch('http://localhost:3000/');
    const data = await res.json();
    setPasswordArray(data);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    if (ref.current.src.includes('icons/eyecross.png')) {
      ref.current.src = 'icons/eye.png';
      passwordRef.current.type = 'password';
    } else {
      ref.current.src = 'icons/eyecross.png';
      passwordRef.current.type = 'text';
    }
  };

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      if (editId) {
        await fetch(`http://localhost:3000/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        setEditId(null);
      } else {
        await fetch('http://localhost:3000/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      setForm({ site: '', username: '', password: '' });
      getPasswords();
    } else {
      toast.error('Please fill all fields properly');
    }
  };

  const editPassword = (item) => {
    setForm({ site: item.site, username: item.username, password: item.password });
    setEditId(item._id);
  };

  const deletePassword = async (id) => {
    if (window.confirm('Do you really want to delete this password?')) {
      await fetch(`http://localhost:3000/${id}`, {
        method: 'DELETE',
      });
      getPasswords();
      toast.success('Password deleted!');
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />

      <div className="flex flex-col items-center w-full">
        <div className="space-x-2 my-10">
          <span className="text-slate-900 text-4xl font-bold">Pass</span>
          <span className="text-green-600 text-4xl font-bold">Manager</span>
          <p className="text-green-900 text-lg text-center my-4">Your own Password Manager</p>
        </div>

        <div className="flex flex-col w-full max-w-xl">
          <input
            value={form.site}
            onChange={handleChange}
            className="border rounded-4xl px-6 py-1 w-full text-center"
            type="text"
            name="site"
            placeholder="Enter url"
          />

          <div className="flex flex-col md:flex-row justify-between gap-5 text-left w-full">
            <input
              value={form.username}
              onChange={handleChange}
              className="border rounded-4xl px-6 py-1 my-7 w-full"
              type="text"
              name="username"
              placeholder="Username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="border rounded-4xl px-7 w-full py-1 my-7"
                type="password"
                name="password"
                placeholder="Password"
              />
              <span className="absolute cursor-pointer right-[10px] top-[33px]" onClick={showPassword}>
                <img ref={ref} className="p-1" width={26} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={savePassword}
          className="border-2 border-green-950 rounded-4xl px-8 py-2 font-bold my-6 bg-green-700 text-white hover:bg-green-800 transition-all duration-300 ease-in-out hover:scale-105"
        >
          {editId ? 'Update' : 'Save'}
        </button>

        <div className="password">
          <h2 className="font-bold text-2xl py-3">Your Passwords</h2>
          <table className="table-auto w-full mb-10">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-2 px-5 text-left">Site</th>
                <th className="py-2 px-5 text-left">Username</th>
                <th className="py-2 px-5 text-left">Password</th>
                <th className="py-2 px-5 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="bg-green-300">
              {passwordArray.map((item) => (
                <tr key={item._id}>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                      <img className="w-4 cursor-pointer" src="icons/copy.png" alt="copy" onClick={() => copyText(item.site)} />
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {item.username}
                      <img className="w-4 cursor-pointer" src="icons/copy.png" alt="copy" onClick={() => copyText(item.username)} />
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {item.password}
                      <img className="w-4 cursor-pointer" src="icons/copy.png" alt="copy" onClick={() => copyText(item.password)} />
                    </div>
                  </td>
                  <td className="flex items-center mx-2 justify-between py-1 text-center">
                    <img className="w-4 cursor-pointer" src="icons/edit.png" alt="edit" onClick={() => editPassword(item)} />
                    <img className="w-4 cursor-pointer" src="icons/delete.png" alt="delete" onClick={() => deletePassword(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Manager;
