import React from "react";

const CompanyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Top Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          My Policy
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Last updated: Aug 14, 2025 12:26
        </p>
      </div>

      {/* Policy Content Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Policy Content
        </h2>

        <div className="space-y-6 text-gray-700 leading-relaxed text-sm">

          <p>
            <span className="font-semibold">
              *EMAIL POLICY:
            </span>{" "}
            The purpose of this policy is to ensure the proper use of Key Software Services Pvt. Ltd. Keyss's email system...
          </p>

          <p>
            <span className="font-semibold">
              *LEGAL RISKS:
            </span>{" "}
            Email is a business communication tool and users are obliged to use this tool in a responsible, effective and lawful manner...
          </p>

          <p>
            <span className="font-semibold">
              *LEGAL REQUIREMENTS:
            </span>{" "}
            The following rules are required by law and are to be strictly adhered to...
          </p>

          <p>
            <span className="font-semibold">
              *ATTENDENCE:
            </span>{" "}
            Employees are expected to arrive at work before they are scheduled to start...
          </p>

          <p>
            <span className="font-semibold">
              *USE OF COMPANY PROPERTY:
            </span>{" "}
            KEYSS will provide you with the necessary equipment to do your job...
          </p>

        </div>
      </div>
    </div>
  );
};

export default CompanyPolicy;