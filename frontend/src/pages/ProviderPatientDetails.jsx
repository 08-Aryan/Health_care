import React from "react";
import { useParams } from "react-router-dom";

const ProviderPatientDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Patient Details</h1>
      <p className="text-gray-700">Viewing details for patient ID: <strong>{id}</strong></p>
      <p className="mt-4 text-sm text-gray-600">This page is a placeholder for provider patient details.</p>
    </div>
  );
};

export default ProviderPatientDetails;
