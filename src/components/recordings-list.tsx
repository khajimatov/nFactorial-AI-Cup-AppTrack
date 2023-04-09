import React from "react";

import useRecordingsList from "~/hooks/use-recordings-list";

import { type RecordingsListProps } from "~/types/recorder";

const RecordingsList = ({ audio }: RecordingsListProps) => {
  const { recordings, deleteAudio } = useRecordingsList(audio);
  return (
    <div>
      {recordings.length > 0 ? (
        <>
          <h1>Your recordings</h1>
          <div className="recordings-list">
            {recordings.map((record) => (
              <div className="record" key={record.key}>
                <audio controls src={record.audio} />
                <div className="delete-button-container">
                  <button
                    className="delete-button"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>No records</>
      )}
    </div>
  );
};

export default RecordingsList;
