import React, { Component } from 'react'

import styles from '../../styles/contact.module.css'

export default class GetInTouch extends Component {
    constructor(props) {
        super(props)

        this.fetchPreviousContactMessage = this.fetchPreviousContactMessage.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeSubject = this.onChangeSubject.bind(this)
        this.onChangeMessage = this.onChangeMessage.bind(this)
        this.onSubmitContactForm = this.onSubmitContactForm.bind(this)
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            disableSubmitButton: false,
        }
    }

    componentDidMount() {
        this.fetchPreviousContactMessage()
    }

    fetchPreviousContactMessage() {
        const contactMessage = window.localStorage.getItem('contact-message')
        if (contactMessage) {
            const data = JSON.parse(contactMessage)
            const { name, subject, message, email } = data

            this.setState({
                name,
                subject,
                message,
                disableSubmitButton: false
            })

            if (email) {

                this.setState({
                    email
                })

                const validateEmail = (email) => {
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                }

                const validEmail = validateEmail(email)
                if (validEmail) {
                    this.setState({
                        disableSubmitButton: false
                    })
                } else {
                    this.setState({
                        disableSubmitButton: true
                    })
                }
            }

        }

    }

    onChangeName(e) {
        const capitalizeEveryWord = str =>
            str.replace(/\b[a-z]/g, char => char.toUpperCase());

        this.setState({
            name: capitalizeEveryWord(e.target.value),
        })
    }

    onChangeEmail(e) {

        const validateEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if (e.target.value.length > 0) {
            const isValied = validateEmail(e.target.value)

            if (isValied) {
                this.setState({
                    disableSubmitButton: false
                })
            } else {
                this.setState({
                    disableSubmitButton: true
                })
            }
        } else {
            this.setState({
                disableSubmitButton: false
            })
        }

        this.setState({
            email: e.target.value,
        })
    }

    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        })
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        })

        if (e.target.value.length > 0) {

            const data = {
                name: this.state.name,
                subject: this.state.subject,
                email: this.state.email,
                message: e.target.value.trim(),
            }

            window.localStorage.setItem('contact-message', JSON.stringify(data))

        } else {
            window.localStorage.removeItem('contact-message')
        }
    }

    onSubmitContactForm(e) {
        e.preventDefault();
        this.setState({
            disableSubmitButton: true
        })
        console.log(this.state)
        console.log('start');

        window.localStorage.removeItem('contact-message')
    }

    render() {
        return (
            <div>
                <div className={styles.contactSectionHeaderSection}>
                    <span>Get in touch</span>
                </div>
                <div className={styles.contactOptions}>
                    <div className={styles.contactLinksSection}>
                        <span>hellooo</span>
                    </div>
                    <div className={styles.contactSection}>
                        <span>Slide into my DMs</span>
                        <form onSubmit={this.onSubmitContactForm} className={styles.contactForm}>
                            <input
                                type="text"
                                required
                                onPaste={(e) => e.preventDefault()}
                                className={styles.contactFormInput}
                                placeholder="Name*"
                                title="What's your name?"
                                value={this.state.name}
                                onChange={this.onChangeName}
                            />
                            <input
                                type="text"
                                onChange={this.onChangeEmail}
                                value={this.state.email}
                                onPaste={(e) => e.preventDefault()}
                                title="So that I can get back to you"
                                className={styles.contactFormInput}
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                onPaste={(e) => e.preventDefault()}
                                required
                                title="Make sure your subect is catchy enough so that I notice."
                                className={styles.contactFormInput}
                                onChange={this.onChangeSubject}
                                value={this.state.subject}
                                placeholder="Subject*"
                            />
                            <textarea
                                value={this.state.message}
                                onChange={this.onChangeMessage}
                                required
                                title="What do you want to talk to me about?"
                                className={styles.contactFormInputTextArea}
                                placeholder="Message*"
                            />
                            <input
                                type="submit"
                                disabled={this.state.disableSubmitButton}
                                className={styles.contactFormInput}
                                placeholder="Message*"
                                value="Send Message"
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
