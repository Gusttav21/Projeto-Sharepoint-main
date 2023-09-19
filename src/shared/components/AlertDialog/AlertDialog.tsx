import * as React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
  } from "@fluentui/react-components";
  import { IAlertDialog } from "./IAlertDialog";

const AlertDialog: React.FunctionComponent<IAlertDialog>=(props)=>{

    const [open,setOpen] = React.useState(false)
    function close(){
        setOpen(false)
        props.closeDialog(false)
    }
    React.useEffect(()=>{

        setOpen(props.openDialog)
    },[props.openDialog,setOpen])

    return (
          <Dialog modalType="alert" open={open} onOpenChange={(event,data)=>close()}>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                  {props.message}
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="primary">Ok</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        );
};

export default AlertDialog