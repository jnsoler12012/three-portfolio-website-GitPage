import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber'
import { Fox } from '../models'
import { Alert, Footer, Loader } from '../Components'
import { useAlertHook } from '../../Application/hooks'

export default function () {
    const formRef = useRef(null)
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [currentAnimation, setCurrentAnimation] = useState('idle')

    const { alert, showAlert, hideAlert } = useAlertHook()


    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }
    const handleFocus = () => setCurrentAnimation('walk')
    const handleBlur = () => setCurrentAnimation('idle')

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setCurrentAnimation('hit')

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
            showAlert({ show: true, text: 'Message sent successfully', type: 'success' })
            setTimeout(() => {
                hideAlert()
                setCurrentAnimation('idle')
                setForm({
                    name: '',
                    email: '',
                    message: ''
                })
            }, 3000);

        }).catch((error) => {
            setIsLoading(false)
            console.log(error);
            setCurrentAnimation('idle')
            showAlert({ show: true, text: 'I did not receive your message', type: 'danger' })
        })
    }

    return (
        <>
            <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
                {alert.show && <Alert {...alert} />}
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

                <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
                    <Canvas
                        camera={{
                            position: [0, 0, 5],
                            fov: 75,
                            near: 0.1,
                            far: 1000
                        }}
                    >
                        <directionalLight intensity={2.5} position={[0, 0, 1]} />
                        <ambientLight intensity={0.5} />
                        <Suspense fallback={<Loader />}>
                            <Fox
                                currentAnimation={currentAnimation}
                                position={[0.5, 0.35, 0]}
                                rotation={[12.6, -0.6, 0]}
                                scale={[0.5, 0.5, 0.5]}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </section>
            <Footer />
        </>
    )
}