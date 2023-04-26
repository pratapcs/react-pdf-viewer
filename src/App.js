import React, { useEffect, useState } from "react";

import { highlightPlugin, MessageIcon } from "@react-pdf-viewer/highlight";

import {
    Position,
    Tooltip,
    Viewer,
    Worker,
} from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';


export default function App() {

    // const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const pdfUrl_old = "https://crestestclv.s3.ap-south-1.amazonaws.com/elibrary/1682500223157file-sample_150kB.pdf";

    const [notes, setNotes] = useState([]);

    const [pdfUrl, setPdfUrl] = useState(pdfUrl_old);
    const [showFirstPageView, setShowFirstPageView] = useState(0);

    const demoUserOrNot = 0;


    useEffect(() => {

    }, [])


    const openLinksPlugin = () => {

        const findLinks = (e) => {
            e.container.querySelectorAll('a:not([data-annotation-link-dest])').forEach((link) => {
                // link.addEventListener('click', handleClick);
            });
        };

        const handleClick = (e) => {
            /* if (demoUserOrNot == 0) {
                e.preventDefault();
            } else {
                e.preventDefault();
                let href = (e.target).href;
                console.log("href", href);

                // let domainName = process.env.REACT_APP_PDFURL;
                let midPath = "demo-e-library-pdf"
                if (href.indexOf("http") >= 0) {
                    //this is an old link and has the full path along with domain name
                    let parts = href.split("/");
                    href = parts[parts.length - 1];
                }
                // let finalURL = domainName + midPath + "/" + href;
                // console.log("href", href);
                // console.log("finalURL", finalURL);
                window.open(finalURL, '_self', 'noreferrer');
            }; */
        }

        return {
            onAnnotationLayerRender: findLinks,
        }
    }

    const openLinksPluginInstance = openLinksPlugin();
    const zoomPluginInstance = zoomPlugin();
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

    let noteId = notes.length;

    const renderHighlightTarget = (props) => {
        const highlightContent = () => {
            const note = {
                id: ++noteId,
                highlightAreas: props.highlightAreas,
                quote: props.selectedText
            };
            // setNotes([...notes, note]);
            props.toggle();
        };
        return (
            <div
                style={{
                    background: "#eee",
                    display: "flex",
                    position: "absolute",
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    transform: "translate(0, 8px)",
                }}
            >
                <Tooltip
                    position={Position.TopCenter}
                    target={
                        <button onClick={highlightContent}>
                            <MessageIcon />
                        </button>
                    }
                    content={() => <div style={{ width: "100px" }}>Highlight</div>}
                    offset={{ left: 0, top: -8 }}
                />
            </div>
        );
    };

    const renderHighlights = (props) => (
        <div>
            {notes.map((note) => (
                <React.Fragment key={note.id}>
                    {note.highlightAreas
                        .filter((area) => area.pageIndex === props.pageIndex)
                        .map((area, idx) => (
                            <div
                                key={idx}
                                style={Object.assign(
                                    {},
                                    {
                                        background: "yellow",
                                        opacity: 0.4
                                    },
                                    props.getCssProperties(area, props.rotation)
                                )}
                            />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );

    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlights
    });

    const renderPage = (props) => {
        return (
            <>
                {props.canvasLayer.children}
                <div style={{ userSelect: 'none' }}>
                    {props.textLayer.children}
                </div>
                {props.annotationLayer.children}
            </>
        );
    };


    return (
        <>
            <div>
                <div className="pdf_fullScreen">
                    <div className="top_back_container_pdf" >
                        <span className="back_arrow"><i className="bi bi-chevron-left"></i></span>
                        Back
                    </div>

                </div>

                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.min.js">
                    <div
                        style={{
                            alignItems: 'center',
                            backgroundColor: '#eeeeee',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '4px',
                        }}
                    >
                        <ZoomOutButton />
                        <ZoomPopover />
                        <ZoomInButton />
                    </div>
                    <div className="pdf_viewer_container"
                        style={{ height: "700px", border: "1px solid rgba(250, 0, 250, 1)" }}

                    >
                        <Viewer
                            initialPage={showFirstPageView}
                            fileUrl={pdfUrl}
                            renderPage={renderPage}
                            plugins={[openLinksPluginInstance, highlightPluginInstance, zoomPluginInstance]}
                        />
                    </div>
                </Worker>
            </div>
        </>
    );
}
