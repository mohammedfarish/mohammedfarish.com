import React, { useEffect, useState } from 'react'
import Editor from "rich-markdown-editor";
import axios from 'axios';
import Router from 'next/router'

import CustomHead from '../../components/head/Head';

import styles from '../../styles/newblogpost.module.css'

import verifyUser from '../../utils/functions/verify';

const NewArticle = () => {

    const [blogTitle, setBlogTitle] = useState('')
    const [pageTitle, setPageTitle] = useState('New Blog Post | Mohammed Farish')
    const [theme, setTheme] = useState('')
    const [slug, setSlug] = useState('')
    const [publish, setPublish] = useState(true)
    const [publishButtonColor, setPublishButtonColor] = useState('lightgreen')
    const [listed, setListed] = useState(true)
    const [listedButtonColor, setListedButtonColor] = useState('lightgreen')
    const [markdownValue, setMarkdownValue] = useState('')
    const [markdownContent, setMarkdownContent] = useState('')
    const [disablePublishButton, setDisablePublishButton] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        verifyOnLoad()
    }, [])

    const verifyOnLoad = async () => {

        const userVerified = await verifyUser()
        if (userVerified) {
            onLoadPage()
            loadTheme()
        } else {
            window.localStorage.removeItem('user')
            Router.push('/blog')
        }

    }

    const loadTheme = () => {
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

        setTheme(light)
    }

    const onLoadPage = () => {
        let data = window.localStorage.getItem('content')
        if (data) {

            data = JSON.parse(data)
            const { content, title, publish, listed } = data

            if (!publish) {
                setPublishButtonColor('transparent')
                setPublish(false)
            }

            if (!listed) {
                setListedButtonColor('transparent')
                setListed(false)
            }

            if (!content && !title) return;

            if (content) {
                setMarkdownValue(content)
                setMarkdownContent(content)
            }

            if (title) {
                setBlogTitle(title)
                setPageTitle(`${title} - New Post | Mohammed Farish`)
                setSlug(encodeURI(title.split(' ').join('-').toLowerCase()))
            }
        } else {
            const data = {
                listed,
                publish
            }
            window.localStorage.setItem('content', JSON.stringify(data))

        }
    }

    const onChangeBlogTitle = (e) => {
        setBlogTitle(e.target.value)

        if (e.target.value) {
            setPageTitle(`${e.target.value.trim()} - New Post | Mohammed Farish`)
            setSlug(encodeURI(e.target.value.trim().split(' ').join('-').toLowerCase()))
        } else {
            setPageTitle('New Blog Post | Mohammed Farish')
            setSlug('')
        }

        let data = {
            content: markdownValue,
            title: e.target.value.trim(),
            publish,
            listed
        }
        window.localStorage.setItem('content', JSON.stringify(data))

    }

    const onChangeMarkdown = (e) => {
        setMarkdownValue(e())

        let data = {
            content: e(),
            title: blogTitle,
            publish,
            listed
        }
        window.localStorage.setItem('content', JSON.stringify(data))
    }

    const onFileUpload = (file) => {
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

    const onChangeStatus = (status) => {
        let data = window.localStorage.getItem('content')

        if (status === 'listed') {
            if (data) {
                data = JSON.parse(data)
                let { content, title, publish, listed } = data
                if (listed) {
                    listed = false
                    setListedButtonColor('transparent')
                    setListed(false)
                } else {
                    listed = true
                    setListedButtonColor('lightgreen')
                    setListed(true)
                }
                data = { content, title, publish, listed }
            }

            if (listed) {
                setListedButtonColor('transparent')
                setListed(false)
            } else {
                setListedButtonColor('lightgreen')
                setListed(true)
            }
        }

        if (status === 'publish') {
            if (data) {
                data = JSON.parse(data)
                let { content, title, publish, listed } = data
                if (publish) {
                    publish = false
                    setPublishButtonColor('transparent')
                    setPublish(false)
                } else {
                    publish = true
                    setPublishButtonColor('lightgreen')
                    setPublish(true)
                }

                data = { content, title, publish, listed }
            }
            if (publish) {
                setPublishButtonColor('transparent')
                setPublish(false)
            } else {
                setPublishButtonColor('lightgreen')
                setPublish(true)
            }
        }

        window.localStorage.setItem('content', JSON.stringify(data))

    }

    const onClickPublish = () => {
        if (markdownValue === '\\\n' ||
            !blogTitle ||
            !markdownValue) return setErrMessage('Error! Cannot publish empty content.')

        setDisablePublishButton(true)

        let content = markdownContent,
            title = blogTitle

        if (markdownContent !== markdownValue) {
            content = markdownValue
        }

        const data = { content, title, listed, publish }

        axios.post('/api/blog/post', data, {
            headers: {
                "x-auth-token": window.localStorage.getItem('user')
            }
        })
            .then(response => {
                if (response.data === true) {
                    window.localStorage.removeItem('content')
                    Router.push('/blog')
                }
            })
            .catch((err) => {
                const status = err.response.status
                if (status === 400) {
                    setDisablePublishButton(false)
                    setErrMessage(`Error! Please make sure that you're logged in with a valid account credential.`)
                } else {
                    setDisablePublishButton(false)
                    setErrMessage('Error! ' + err.message)
                }
            })
    }

    return (
        <div className={styles.newblogpostpage}>
            <CustomHead title={pageTitle} />
            <span className={styles.newBlogPostErrorMessage}>{errMessage}</span>
            <div className={styles.newBlogPostPublishButtonSection}>
                <button
                    className={styles.newBlogPostPublishButton}
                    disabled={disablePublishButton}
                    onClick={onClickPublish}
                >PUBLISH</button>
            </div>
            <div className={styles.blogStatusSection}>
                <span style={{ background: publishButtonColor }} onClick={() => onChangeStatus('publish')} className={styles.blogStatusSectionItem}>PUBLISH</span>
                <span style={{ background: listedButtonColor }} onClick={() => onChangeStatus('listed')} className={styles.blogStatusSectionItem}>LISTED</span>
            </div>
            <input
                className={styles.newBlogPostField}
                type="text"
                autoFocus
                placeholder="Add title"
                value={blogTitle}
                onChange={onChangeBlogTitle}
            />
            <div className={styles.newBlogPostSlug}>
                <span>Blog Post URL: https://www.mohammedfarish.com/blog/{slug}</span>
            </div>
            <div className={styles.newBlogPostEditor}>
                <Editor
                    className={styles.newBlogPostEditor}
                    value={markdownContent}
                    onChange={onChangeMarkdown}
                    dictionary
                    onCancel={() => console.log('cancelled')}
                    theme={theme}
                    uploadImage={async (file) => {
                        console.log(file)
                        onFileUpload(file)
                        return "https://cdn.discordapp.com/attachments/726328135393476609/832274177247150130/Logo_1.png"
                    }}
                />
            </div>
        </div>
    )
}

export default NewArticle
