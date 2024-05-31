import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RedirectService from "services/RedirectService";
import { setModule } from "store/slices/navigationSlice";
import ErrorOne from "views/auth-views/errors/error-page-1";

const Administration = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const module = window.location.pathname.split("/")[3];

  console.log(module);

  useEffect(() => {
    RedirectService.redirectModule(module).then((response) => {
      console.log(response);
      setUrl(response.redirectTo);
    });
    dispatch(setModule(module));
  }, [module, dispatch]);

  return (
    <div>
      <ErrorOne url={url} />
    </div>
  );
};

export default Administration;
