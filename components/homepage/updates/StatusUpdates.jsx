import axios from "axios";
import React, { PureComponent } from "react";

export default class StatusUpdates extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
    };
  }

  componentDidMount() {
    axios.get("/api/statusupdate")
      .then((response) => {
        if (response.data) {
          this.setState({
            status: response.data,
          });
        }
      });
  }

  render() {
    const { status } = this.state;

    if (!status) return <div hidden />;

    return (
      <div className="mf-bevel mt-10 flex justify-center flex-col select-none px-4 py-5 drop-shadow-mf bg-mf-white ">
        <div>
          <span className="underline font-bold text-xl">Latest Update</span>
          <span style={{ color: "red" }}>*</span>
        </div>
        <div className="flex justify-center flex-col my-1">
          <span className="text-sm w-full text-justify">{status.content}</span>
          <span className="mt-1 text-xs text-mf-grey">
            Updated
            {" "}
            {status.date}
          </span>
        </div>
      </div>
    );
  }
}
