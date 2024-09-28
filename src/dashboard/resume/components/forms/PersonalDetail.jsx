import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);

  // Sync formData with resumeInfo when resumeInfo is available
  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || '',
        lastName: resumeInfo.lastName || '',
        jobTitle: resumeInfo.jobTitle || '',
        address: resumeInfo.address || '',
        phone: resumeInfo.phone || '',
        email: resumeInfo.email || ''
      });
    }
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enabledNext(false); // Disable the next button when typing
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Update resumeInfo in context as well
    setResumeInfo({
      ...resumeInfo,
      [name]: value
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData
    };

    try {
      const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      console.log(resp);
      enabledNext(true);
      setLoading(false);
      toast('Details updated');
    } catch (error) {
      setLoading(false);
      toast.error('Failed to update details. Please try again.');
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={formData.address}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={formData.email}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
