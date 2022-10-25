import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function Main() {
    const [Input, setInput] = useState()
    const [preview, setpreview] = useState(false)
    const [HtmlText, setHtmlText] = useState()
    const [Dark, setDark] = useState(false)

    const CodeHighLigh = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    customStyle={{
                        borderRadius: 5,
                        backgroundColor: Dark ? '#000222' : '#cecef522',
                        marginLeft: -5,
                        width: '94%',
                        color: 'black'
                    }}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
    };

    const InputText = (e) => {
        setInput(e.target.value)
        setpreview(true)
        if (e.target.value === '') {
            setpreview(false)
            setHtmlText('')
        }
    }
    useEffect(() => {
        const el = document.querySelector('.OutPutText');
        if (el) {
            const mdHTML = el.innerHTML;
            setHtmlText(mdHTML);
        }
    }, [Input]);

    const DarkSyntax = () => {
        setDark(!Dark)
    }

    return (
        <div>
            {/** Header */}
            <div className='TitleHeader'>
                <div>
                    <h4>Md</h4>
                </div>
                {
                    preview
                        ?
                        <div style={{ marginRight: 280, display: 'flex', flexDirection: 'row' }}>
                            <h4>OutPut |</h4>
                            <h4 onClick={() => DarkSyntax()} className='DarkMode'>CodeSyntax</h4>
                        </div>
                        :
                        null
                }
            </div>
            {/** Input And Output */}
            <div className='Container'>
                <textarea className='InputText' autoFocus={true} placeholder='Type....' onChange={(e) => InputText(e)} spellCheck={false} />
                {
                    preview
                        ?
                        <div className='OutPut'>
                            <ReactMarkdown className='OutPutText' rehypePlugins={[rehypeRaw]} components={CodeHighLigh}>
                                {Input}
                            </ReactMarkdown>
                        </div>
                        :
                        null
                }
            </div>

            {/** Convert */}
            <div>
                <div style={{ margin: 10, fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                    <h4>Convert</h4>
                </div>
                <div className='Converter'>
                    {HtmlText}
                </div>
            </div>
        </div>
    )
}

export default Main