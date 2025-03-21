import "./styles.css";
import { FaClock } from "react-icons/fa";

const user = {
    timeSpentHours: 32
}
export default function TimeSpentWidget(){
    return (
        <div className="bg-glassmorphism rounded-2xl shadow-md p-4">
            <div className="mb-2 flex justify-between items-center">
                <h2 className="text-xl font-bold">Time Spent Coding</h2>
            </div>
            <FaClock className="text-blue-400 text-2xl" />
            <p className="font-medium text-lg">{user.timeSpentHours} hrs</p>
            <span className="text-sm text-gray-400">Total Time Spent Coding</span>
        </div>
    );
}