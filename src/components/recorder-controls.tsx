import React from "react";

import { formatMinutes, formatSeconds } from "~/utils/format-time";

import { type RecorderControlsProps } from "~/types/recorder";

const RecorderControls = ({ recorderState, handlers }: RecorderControlsProps) => {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;
  return (
    <div>
      <div>
        Сколько идет {formatMinutes(recordingMinutes)}:{formatSeconds(recordingSeconds)}
      </div>
      <div>Идет запись ? {initRecording ? "Да" : "Нет"}</div>
      <div>
        <button onClick={startRecording}>Начать запись</button>
      </div>
      <div>
        <button onClick={saveRecording}>Сохранить запись</button>
      </div>
      <div>
        <button onClick={cancelRecording}>Отменить запись</button>
      </div>
    </div>
  );
};

export default RecorderControls;
