import React, { useState } from "react";

const JoinPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sex: "",
    division: "",
    district: "",
    occupation: "",
    education: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("You must accept the Terms and Conditions.");
      return;
    }
    // এখানে তুমি API call বা অন্য লজিক যোগ করতে পারো
    alert("Form submitted successfully!");
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-black rounded shadow mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Volunteer Registration
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <div className="col-span-1">
          <label className="block mb-1 font-semibold" htmlFor="name">
            Name *
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Your full name"
          />
        </div>

        {/* Personal Email */}
        <div className="col-span-1">
          <label className="block mb-1 font-semibold" htmlFor="email">
            Personal Email *
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="you@example.com"
          />
        </div>

        {/* Phone */}
        <div className="col-span-1">
          <label className="block mb-1 font-semibold" htmlFor="phone">
            Phone*
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="+8801XXXXXXXXX"
          />
        </div>

        {/* Sex */}
        <div className="col-span-1">
          <label className="block mb-1 font-semibold">Sex *</label>
          <select
            required
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select your sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Division */}
        <div className="col-span-1">
          <label className="block mb-1 font-semibold">Division *</label>
          <select
            required
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select division</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Khulna">Khulna</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Barishal">Barishal</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Mymensingh">Mymensingh</option>
          </select>
        </div>

        {/* District */}
        <div className="col-span-1">
          <label className="block mb-1 font-semibold">District *</label>
          <input
            required
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Your district"
          />
        </div>

        {/* Occupation */}
        <div className="col-span-1">
          <label className="block mb-1 font-semibold">
            What describes your occupation best? *
          </label>
          <select
            required
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select occupation</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="business">Business</option>
            <option value="government">Government Service</option>
            <option value="freelancer">Freelancer</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Education */}
        <div className="col-span-1">
          <label className="block mb-1 font-semibold">
            Your Highest Level of Education *
          </label>
          <select
            required
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select education level</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="higher_secondary">Higher Secondary</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD or higher</option>
          </select>
        </div>

        {/* Terms and Conditions */}
        <div className="col-span-full flex items-center">
          <input
            required
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="acceptTerms" className="text-sm">
            I accept the Terms and Conditions.
          </label>
        </div>

        {/* Submit button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="bg-[#48bec7] hover:bg-[#528083] text-black font-semibold py-3 px-8 rounded-full transition w-full md:w-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinPage;
