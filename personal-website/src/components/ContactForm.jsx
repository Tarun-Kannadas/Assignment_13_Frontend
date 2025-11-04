import React, {useState} from 'react';

export default function ContactForm(){
  const [form, setForm] = useState({name:'', email:'', phone:'', place:'', message:''});
  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/contact', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)
    });
    if(res.ok){ alert('Thanks!'); setForm({name:'', email:'', phone:'', place:'', message:''}); }
    else alert('Error');
  };
  return (
    <form onSubmit={onSubmit}>
      <input name="name" value={form.name} onChange={onChange} required/>
      <input name="email" value={form.email} onChange={onChange} required/>
      <input name="phone" value={form.phone} onChange={onChange}/>
      <input name="place" value={form.place} onChange={onChange}/>
      <textarea name="message" value={form.message} onChange={onChange} required/>
      <button type="submit">Send</button>
    </form>
  );
}
