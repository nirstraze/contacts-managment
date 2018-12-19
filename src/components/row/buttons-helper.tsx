import React from "react";
import { Fab, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CopyIcon from "@material-ui/icons/FileCopy";
import CancelIcon from "@material-ui/icons/Cancel";

import "./table-row.css";

export const getEditButton = (onClick: () => void): React.ReactNode => (
  <Fab
    size="small"
    color="primary"
    title={"Edit Contact"}
    style={{
      margin: 5
    }}
  >
    <EditIcon onClick={onClick} />
  </Fab>
);

export const getDeleteButton = (onClick: () => void): React.ReactNode => (
  <Fab
    size="small"
    color="primary"
    title={"Delete Contact"}
    style={{
      margin: 5
    }}
  >
    <DeleteIcon onClick={onClick} />
  </Fab>
);

export const getAddButton = (onClick: () => void): React.ReactNode => (
  <Fab
    size="small"
    color="primary"
    title={"Add Contact"}
    style={{
      margin: 5
    }}
  >
    <AddIcon onClick={onClick} />
  </Fab>
);

export const getCancelButton = (onClick: () => void): React.ReactNode => (
  <Fab
    size="small"
    color="primary"
    title={"Cancel"}
    style={{
      margin: 5
    }}
  >
    <CancelIcon onClick={onClick} />
  </Fab>
);

export const getCopyButton = (onClick: () => void): React.ReactNode => (
  <Fab
    size="small"
    color="primary"
    title={"Duplicate Contact"}
    style={{
      margin: 5
    }}
  >
    <CopyIcon onClick={onClick} />
  </Fab>
);

export const getCheckButton = (onClick: () => void): React.ReactNode => (
  <Fab
    size="small"
    color="primary"
    title={"OK"}
    style={{
      margin: 5
    }}
  >
    <CheckIcon onClick={onClick} />
  </Fab>
);

export const getLabeledButton = (
  label: string,
  onClick: () => void
): React.ReactNode => (
  <Button
    size="small"
    variant="contained"
    color="primary"
    onClick={onClick}
    style={{
        margin: 5
      }}
  >
    {label}
  </Button>
);
