import React from "react";
import CreateCourse from "../../../../../Components/Sub/Courses/CreateCourse";

const EditPage = ({ params }) => {
  return (
    <div>
      <CreateCourse id={params.id} />
    </div>
  );
};

export default EditPage;
