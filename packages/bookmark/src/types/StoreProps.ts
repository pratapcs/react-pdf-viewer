/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2022 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import type { PdfJs } from '@react-pdf-viewer/core';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';

export interface StoreProps {
    // Manage the expanded/collapsed state of each bookmark item
    bookmarkExpandedMap: Map<string, boolean>;
    doc?: PdfJs.PdfDocument;
    // Map from dest to the annotation container
    linkAnnotations: Record<string, HTMLElement>;
    jumpToDestination?: (
        pageIndex: number,
        bottomOffset: number,
        leftOffset: number,
        scaleTo: number | SpecialZoomLevel
    ) => void;
}
