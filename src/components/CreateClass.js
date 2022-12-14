import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
  } from "@material-ui/core";
  import React, { useState } from "react";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { useRecoilState } from "recoil";
  import { auth, db } from "../firebase";
  import { createDialogAtom } from "../utils/atoms";
  function CreateClass() {
    const [user, loading, error] = useAuthState(auth);
    const [open, setOpen] = useRecoilState(createDialogAtom);
    const [className, setClassName] = useState("");
    const [instructorName, setInstructorName] = useState("");
    const [CourseCode, setCourseCode] = useState("");
    const handleClose = () => {
      setOpen(false);
    };
    const createClass = async () => {
      try {
        console.log(user.uid,user.displayName)
        const newClass = await db.collection("classes").add({
          creatorUid: user.uid,
          name: className,
          instructor:instructorName,
          coursecode:CourseCode, 
          creatorName: user.displayName,
          creatorPhoto: user.photoURL,
          posts: [],
        });
        // add to current user's class list
        console.log(newClass.id);
        const userRef = await db
          .collection("users")
          .where("uid", "==", user.uid)
          .get();

        console.log(userRef.docs[0]);

        const docId = userRef.docs[0].id;
        const userData = userRef.docs[0].data();
        let userClasses = userData.enrolledClassrooms;
        userClasses.push({
          id: newClass.id,
          name: className,
          instructor:instructorName,
          coursecode:CourseCode, 
          creatorName: user.displayName,
          creatorPhoto: user.photoURL,
        });
        const docRef = await db.collection("users").doc(docId);
        await docRef.update({
          enrolledClassrooms: userClasses,
        });
        handleClose();
        alert("Classroom created successfully!");
      } catch (err) {
        alert(`Cannot create class - ${err.message}`);
      }
    };
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create class</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name and instructor we will create a classroom for you!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Class Name"
              type="text"
              fullWidth
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Instructor Name"
              type="text"
              fullWidth
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Course code"
              type="text"
              fullWidth
              value={CourseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={createClass} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  export default CreateClass;