import React, { Component } from 'react'
import Head from 'next/head'
import Editor from "rich-markdown-editor";
import axios from 'axios';

import styles from '../../styles/newblogpost.module.css'
import verifyUser from '../../utils/functions/verify';

export default class NewBlogPost extends Component {
    constructor(props) {
        super(props)

        this.loadTheme = this.loadTheme.bind(this)
        this.onLoadPage = this.onLoadPage.bind(this)
        this.validateTitleContent = this.validateTitleContent.bind(this)
        this.onChangeBlogTitle = this.onChangeBlogTitle.bind(this)
        this.onChangeMarkdown = this.onChangeMarkdown.bind(this)
        this.onFileUpload = this.onFileUpload.bind(this)
        this.onClickPublish = this.onClickPublish.bind(this)
        this.state = {
            markDownValue: '',
            blogTitle: '',
            pageTitle: 'New Blog Post | Mohammed Farish',
            slug: '',
            markDownContent: '',
            theme: '',
            disablePublishButton: false,
            errorMessage: '',
        }
    }

    async componentDidMount() {
        const userVerified = await verifyUser()
        if (userVerified) {
            this.onLoadPage()
            this.loadTheme()
        } else {
            window.localStorage.removeItem('user')
            window.location = "/blog"
        }
    }

    loadTheme() {
        const colors = {
            almostBlack: "#181A1B",
            lightBlack: "#2F3336",
            almostWhite: "#E6E6E6",
            white: "#FFF",
            white10: "rgba(255, 255, 255, 0.1)",
            black: "#000",
            black10: "rgba(0, 0, 0, 0.1)",
            primary: "#1AB6FF",
            greyLight: "#F4F7FA",
            grey: "#E8EBED",
            greyMid: "#C5CCD3",
            greyDark: "#DAE1E9",
        };

        const base = {
            ...colors,
            fontFamily:
                "'Roboto Mono', monospace",
            // "'Roboto', sans-serif",
            // "'Poppins', sans- serif",
            fontFamilyMono:
                "'Roboto Mono', monospace",
            // "'Roboto', sans-serif",
            // "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace",
            fontWeight: 400,
            zIndex: 100,
            link: colors.primary,
            placeholder: "#B1BECC",
            textSecondary: "#4E5C6E",
            textLight: colors.white,
            textHighlight: "#b3e7ff",
            textHighlightForeground: colors.black,
            selected: colors.primary,
            codeComment: "#6a737d",
            codePunctuation: "#5e6687",
            codeNumber: "#d73a49",
            codeProperty: "#c08b30",
            codeTag: "#3d8fd1",
            codeString: "#032f62",
            codeSelector: "#6679cc",
            codeAttr: "#c76b29",
            codeEntity: "#22a2c9",
            codeKeyword: "#d73a49",
            codeFunction: "#6f42c1",
            codeStatement: "#22a2c9",
            codePlaceholder: "#3d8fd1",
            codeInserted: "#202746",
            codeImportant: "#c94922",

            blockToolbarBackground: colors.white,
            blockToolbarTrigger: colors.greyMid,
            blockToolbarTriggerIcon: colors.white,
            blockToolbarItem: colors.almostBlack,
            blockToolbarIcon: undefined,
            blockToolbarIconSelected: colors.black,
            blockToolbarText: colors.almostBlack,
            blockToolbarTextSelected: colors.black,
            blockToolbarHoverBackground: colors.greyLight,
            blockToolbarDivider: colors.greyMid,

            noticeInfoBackground: "#F5BE31",
            noticeInfoText: colors.almostBlack,
            noticeTipBackground: "#9E5CF7",
            noticeTipText: colors.white,
            noticeWarningBackground: "#FF5C80",
            noticeWarningText: colors.white,
        };

        const light = {
            ...base,
            background: colors.white,
            text: colors.almostBlack,
            code: colors.lightBlack,
            cursor: colors.black,
            divider: colors.greyMid,

            toolbarBackground: colors.lightBlack,
            toolbarHoverBackground: colors.black,
            toolbarInput: colors.white10,
            toolbarItem: colors.white,

            tableDivider: colors.greyMid,
            tableSelected: colors.primary,
            tableSelectedBackground: "#E5F7FF",

            quote: colors.greyDark,
            codeBackground: colors.greyLight,
            codeBorder: colors.grey,
            horizontalRule: colors.greyMid,
            imageErrorBackground: colors.greyLight,

            scrollbarBackground: colors.greyLight,
            scrollbarThumb: colors.greyMid,
        };

        const dark = {
            ...base,
            background: colors.almostBlack,
            text: colors.almostWhite,
            code: colors.almostWhite,
            cursor: colors.white,
            divider: "#4E5C6E",
            placeholder: "#52657A",

            toolbarBackground: colors.white,
            toolbarHoverBackground: colors.greyMid,
            toolbarInput: colors.black10,
            toolbarItem: colors.lightBlack,

            tableDivider: colors.lightBlack,
            tableSelected: colors.primary,
            tableSelectedBackground: "#002333",

            quote: colors.greyDark,
            codeBackground: colors.black,
            codeBorder: colors.lightBlack,
            codeString: "#3d8fd1",
            horizontalRule: colors.lightBlack,
            imageErrorBackground: "rgba(0, 0, 0, 0.5)",

            scrollbarBackground: colors.black,
            scrollbarThumb: colors.lightBlack,
        };

        this.setState({
            theme: light
        })
    }

    onLoadPage() {
        let data = window.localStorage.getItem('content')
        if (data) {

            data = JSON.parse(data)
            const { content, title } = data
            if (!content && !title) return;

            if (content) {
                this.setState({
                    markDownContent: content,
                    markDownValue: content
                })
            }

            if (title) {
                this.setState({
                    blogTitle: title,
                    pageTitle: `${title} - New Post | Mohammed Farish`,
                    slug: encodeURI(title.split(' ').join('-').toLowerCase())
                })
            }
        }
    }

    validateTitleContent(data) {
        const { content, title } = data
        if (content && title) {
            this.setState({
                disablePublishButton: false
            })
        } else {
            this.setState({
                disablePublishButton: true
            })
        }
    }

    onChangeBlogTitle(e) {

        this.setState({
            blogTitle: e.target.value
        })

        if (e.target.value) {
            this.setState({
                pageTitle: `${e.target.value.trim()} - New Post | Mohammed Farish`,
                slug: encodeURI(e.target.value.trim().split(' ').join('-').toLowerCase())
            })
        } else {
            this.setState({
                pageTitle: 'New Blog Post | Mohammed Farish',
                slug: ''
            })
        }

        let data = {
            content: this.state.markDownValue,
            title: e.target.value.trim()
        }
        window.localStorage.setItem('content', JSON.stringify(data))
    }

    onChangeMarkdown(e) {
        this.setState({
            markDownValue: e()
        })

        let data = {
            content: e(),
            title: this.state.blogTitle
        }
        window.localStorage.setItem('content', JSON.stringify(data))
    }

    onFileUpload(file) {
        let formData = new FormData();
        formData.append("file", file);

        axios.post('/api/blog/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                console.log(response.data)
            })
        console.log(formData)
    }

    onClickPublish() {
        const { markDownContent, blogTitle, markDownValue } = this.state
        // if (!blogTitle) return;
        if (markDownValue === '\\\n' ||
            !blogTitle ||
            !markDownValue) return this.setState({
                errorMessage: 'Error! Cannot publish empty content.',
            })

        this.setState({
            disablePublishButton: true
        })

        let content = markDownContent,
            title = blogTitle

        if (markDownContent !== markDownValue) {
            content = markDownValue
        }

        const data = { content, title }

        axios.post('/api/blog/post', data, {
            headers: {
                "x-auth-token": window.sessionStorage.getItem('session')
            }
        })
            .then(response => {
                if (response.data === true) {
                    window.localStorage.removeItem('content')
                    window.location = "/blog"
                }
            })
            .catch((err) => {
                console.log(err.response.status)
                const status = err.response.status
                if (status === 400) {
                    this.setState({
                        errorMessage: `Error! Please make sure that you're logged in with a valid account credential.`
                    })
                } else {
                    this.setState({
                        errorMessage: "Error! " + err.message
                    })
                }
            })
    }

    render() {
        return (
            <div className={styles.newblogpostpage}>
                <Head>
                    <title>{this.state.pageTitle}</title>
                </Head>
                <span className={styles.newBlogPostErrorMessage}>{this.state.errorMessage}</span>
                <div className={styles.newBlogPostPublishButtonSection}>
                    <button
                        className={styles.newBlogPostPublishButton}
                        disabled={this.state.disablePublishButton}
                        onClick={this, this.onClickPublish}
                    >PUBLISH</button>
                </div>
                <input
                    className={styles.newBlogPostField}
                    type="text"
                    autoFocus
                    placeholder="Add title"
                    value={this.state.blogTitle}
                    onChange={this.onChangeBlogTitle}
                />
                <div className={styles.newBlogPostSlug}>
                    <span>Blog Post URL: https://www.mohammedfarish.com/blog/{this.state.slug}</span>
                </div>
                <div className={styles.newBlogPostEditor}>
                    <Editor
                        className={styles.newBlogPostEditor}
                        value={this.state.markDownContent}
                        onChange={this.onChangeMarkdown}
                        dictionary
                        onCancel={() => console.log('cancelled')}
                        theme={this.state.theme}
                        uploadImage={async (file) => {
                            console.log(file)
                            this.onFileUpload(file)
                            return "https://cdn.discordapp.com/attachments/726328135393476609/832274177247150130/Logo_1.png"
                        }}
                    />
                </div>
            </div>
        )
    }
}
