import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressComps = (props) => {
  return (
    <div className="wrapper h-56 w-fit flex flex-col items-center ">
      <CircularProgressbar
        value={props.percentage}
        text={`${props.value}`}
        circleRatio={0.75}
        styles={buildStyles({
          rotation: 1 / 2 + 1 / 8,
          trailColor: "#eee",
          pathColor: "rgb(249 115 22)",
          textColor: "rgb(249 115 22)",
        })}
      />
      <p className="capitalize ">{props.caption}</p>
      <p className="capitalize font-semibold">{props.time}</p>
    </div>
  );
};

export default ProgressComps;
