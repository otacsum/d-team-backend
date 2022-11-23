import {ConfirmDto} from "./confirm.dto";

/**
 * Helper Function
 * @param err Caught Error
 * @returns Object containing error details.
 */
export class generateFriendlyError {

    constructor(err: any) {
        let payload: ConfirmDto;
        try {
            const errorMessage: string = `Failed: ${err.message}`;
            const errorDetail: string = err.original.detail;
            console.log(errorMessage);

            payload = {
                success: false,
                message: errorMessage,
                detail: errorDetail
            }

            // return a good error detail if available
            return payload;
        } catch (err) {
            // catch inner error when detail not available.
            console.log(err.message);
        }
        // create detail of outer error if detail not available.
        payload = {
            success: false,
            message: '',
            detail: err.message
        }
        return payload;
    }
}
