import * as React from "react";
import { ILoading } from "./ILoading";
import { Dialog, DialogBody, DialogContent, DialogSurface, Spinner } from "@fluentui/react-components";

const Loading:React.FunctionComponent<ILoading>=(props)=>{
    return (
        <Dialog modalType="alert" open={props.openLoading} >
          <DialogSurface>
            <DialogBody>
              <DialogContent>
                <Spinner size="medium" label={props.message} style={{margin:'10px'}}/>
              </DialogContent>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      );
}

export default Loading;