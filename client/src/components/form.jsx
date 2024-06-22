import React, { useState, useEffect } from 'react';

const initialFormState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  applyingForPosition: '',
  relevantExperience: '',
  portfolioURL: '',
  managementExperience: '',
  additionalSkills: [],
  preferredInterviewTime: '',
};

const JobApplicationForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        additionalSkills: [...prevState.additionalSkills, name],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        additionalSkills: prevState.additionalSkills.filter((skill) => skill !== name),
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }

    if ((formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && !formData.relevantExperience.trim()) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if ((formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && isNaN(formData.relevantExperience)) {
      errors.relevantExperience = 'Relevant Experience must be a number';
    } else if ((formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && formData.relevantExperience <= 0) {
      errors.relevantExperience = 'Relevant Experience must be greater than 0';
    }

    if (formData.applyingForPosition === 'Designer' && !formData.portfolioURL.trim()) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (formData.applyingForPosition === 'Designer' && !/^https?:\/\/\S+$/.test(formData.portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL must be a valid URL';
    }

    if (formData.applyingForPosition === 'Manager' && !formData.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }

    if (formData.additionalSkills.length === 0) {
      errors.additionalSkills = 'Select at least one skill';
    }

    if (!formData.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    } else {
      const interviewTime = new Date(formData.preferredInterviewTime).getTime();
      if (isNaN(interviewTime) || interviewTime < Date.now()) {
        errors.preferredInterviewTime = 'Preferred Interview Time must be a future date/time';
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      console.log('Form submitted successfully:', formData);
    }
  }, [isSubmitted]);

  return (
    <div className="bg-gray-300 h-full p-6">
      <h1 className="font-serif text-center font-bold text-2xl text-sky-600">Job Application Form</h1>
      <div className="max-w-xl mx-auto p-5 bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-900 backdrop-blur-xl shadow-lg shadow-gray-400/75 mt-4 rounded-xl" style={{ minHeight: '600px' }}>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sky-200 font-serif font-bold">Full Name:</label>
              <input
                type="text"
                placeholder='Enter your Full Name'
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sky-200 font-serif font-bold">Email:</label>
              <input
                type="email"
                placeholder='Enter your Email ID'
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sky-200 font-serif font-bold">Phone Number:</label>
              <input
                type="tel"
                placeholder='Enter your Phone No.'
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sky-200 font-serif font-bold">Applying for Position:</label>
              <select
                name="applyingForPosition"
                value={formData.applyingForPosition}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select...</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            {(formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && (
              <div className="mb-4">
                <label className="block text-sky-200 font-serif font-bold">Relevant Experience (years):</label>
                <input
                  type="number"
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleChange}
                  min={1}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {errors.relevantExperience && <span className="text-red-500 text-sm">{errors.relevantExperience}</span>}
              </div>
            )}

            {formData.applyingForPosition === 'Designer' && (
              <div className="mb-4">
                <label className="block text-sky-200 font-serif font-bold">Portfolio URL:</label>
                <input
                  type="url"
                  name="portfolioURL"
                  value={formData.portfolioURL}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {errors.portfolioURL && <span className="text-red-500 text-sm">{errors.portfolioURL}</span>}
              </div>
            )}

            {formData.applyingForPosition === 'Manager' && (
              <div className="mb-4">
                <label className="block text-sky-200 font-serif font-bold">Management Experience:</label>
                <textarea
                  name="managementExperience"
                  value={formData.managementExperience}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {errors.managementExperience && <span className="text-red-500 text-sm">{errors.managementExperience}</span>}
              </div>
            )}

            <fieldset className="mb-4">
              <legend className="block text-sky-200 font-serif font-bold mb-2">Additional Skills:</legend>
              <label className="inline-flex items-center font-bold font-mono text-white">
                <input
                  type="checkbox"
                  name="JavaScript"
                  checked={formData.additionalSkills.includes('JavaScript')}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                /> JavaScript
              </label>
              <label className="inline-flex items-center font-bold font-mono text-white ml-4">
                <input
                  type="checkbox"
                  name="React"
                  checked={formData.additionalSkills.includes('React')}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                /> React
              </label>
              <label className="inline-flex items-center font-bold font-mono text-white ml-4">
                <input
                  type="checkbox"
                  name="Python"
                  checked={formData.additionalSkills.includes('Python')}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                /> Python
              </label>
            </fieldset>
            {errors.additionalSkills && <span className="text-red-500 text-sm">{errors.additionalSkills}</span>}

            <div className="mb-4">
              <label className="block text-sky-200 font-serif font-bold">Preferred Interview Time:</label>
              <input
                type="datetime-local"
                name="preferredInterviewTime"
                value={formData.preferredInterviewTime}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-500"
                required
              />
              {errors.preferredInterviewTime && <span className="text-red-500 text-sm">{errors.preferredInterviewTime}</span>}
            </div>

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center mt-10 text-sky-200 font-serif" style={{ minHeight: '600px' }}>
            <h2 className="text-2xl font-semibold text-sky-300 mb-4">Form Submitted Successfully</h2>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Applying for Position:</strong> {formData.applyingForPosition}</p>
            {(formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && (
              <p><strong>Relevant Experience (years):</strong> {formData.relevantExperience}</p>
            )}
            {formData.applyingForPosition === 'Designer' && (
              <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
            )}
            {formData.applyingForPosition === 'Manager' && (
              <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
            )}
            <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
            <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm;
