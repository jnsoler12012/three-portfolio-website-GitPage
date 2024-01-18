import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export default function () {
    const formRef = useRef(null)

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }
    const handleFocus = () => { }
    const handleBlur = () => { }
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        emailjs.send(
            process.env.WEBPACK_EMAILJS_SERVICE_ID,
            process.env.WEBPACK_EMAILJS_TEMPLATE_ID,
            {
                from_name: form.name,
                to_name: "Nicolas",
                from_email: form.email,
                to_email: 'jnsoler04@gmail.com',
                message: form.message
            },
            process.env.WEBPACK_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setIsLoading(false)

            setForm({
                name: '',
                email: '',
                message: ''
            })
        }).catch(() => {
            setIsLoading(false)
        })
    }

    return (
        <section className="relative flex lg:flex-row flex-col max-container">
            <div className="flex-1 min-w-[50%] flex flex-col"> <h1 className="head-text">Get in Touch</h1>
                <form
                    className="w-full flex flex-col gap-7 mt-14"
                    onSubmit={handleSubmit}
                >
                    <label className="text-black-500 font-semibold">
                        Name
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="John"
                            required
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                        />

                    </label>
                    <label className="text-black-500 font-semibold">
                        Email
                        <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="john@doe.com"
                            required
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                        />

                    </label>
                    <label className="text-black-500 font-semibold">
                        Your Message
                        <textarea
                            name="message"
                            rows={4}
                            className="input"
                            placeholder="Let me know how I can help you!"
                            required
                            value={form.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                        />
                    </label>
                    <button
                        type='submit'
                        className='btn'
                        disabled={isLoading}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    )
}