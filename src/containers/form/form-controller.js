import React, { useEffect } from "react";
import { AuthContext } from "context";
import { firebase } from "config";
import moment from "moment";
import View from "./form-view";

const emptyState = {
  date: moment().format("YYYY-MM-DD"),
  activities: {}
};

const Controller = () => {
  const db = firebase.firestore();
  const userCtx = React.useContext(AuthContext);

  const [data, setData] = React.useState(emptyState);
  const [activites, setActivites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isSaving, setSaving] = React.useState(false);

  const _handleChange = (name, value) => {
    data.activities[name] = value;
    setData({ ...data });
  };

  const _handleChangeDate = value => {
    data.date = value;
    setData({ ...data });
  };

  const _save = async () => {
    setSaving(true);
    await db
      .collection("users")
      .doc(userCtx.profile.email)
      .collection("daily_activity")
      .doc(data.date)
      .set(data.activities);
    setSaving(false);
  };

  useEffect(() => {
    const _loadActivites = async () => {
      setLoading(true);
      const rsp = await db.collection("activities").get();
      setActivites(rsp.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    _loadActivites();
  }, [db]);

  useEffect(() => {
    const _loadUserActivity = async () => {
      setLoading(true);
      const rsp = await db
        .collection("users")
        .doc(userCtx.profile.email)
        .collection("daily_activity")
        .doc(data.date)
        .get();
      setData({ date: data.date, activities: rsp.data() || {} });
      setLoading(false);
    };
    _loadUserActivity();
  }, [db, userCtx, data.date]);

  return (
    <View
      isLoading={isLoading}
      data={data}
      activites={activites}
      onChange={_handleChange}
      onChangeDate={_handleChangeDate}
      onSubmit={_save}
      isSaving={isSaving}
    />
  );
};

export default Controller;
