import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';

function EditResume() {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState(null); // Initial state as null

    useEffect(() => {
        if (resumeId) {
            GetResumeInfo();
        }
    }, [resumeId]); // Adding resumeId as a dependency

    const GetResumeInfo = async () => {
        try {
            // Log the resumeId to ensure it's correctly passed
            console.log('Fetching resume with ID:', resumeId);
            
            const resp = await GlobalApi.GetResumeById(resumeId);
            console.log('API Response:', resp);  // Log the entire response object
            console.log('API Response Data:', resp.data);  // Log the data portion of the response
            
            // Check the structure before accessing data.data
            if (resp?.data?.data) {
                setResumeInfo(resp.data.data);
            } else {
                console.error('Unexpected response structure:', resp);
            }
        } catch (error) {
            console.error('Error fetching resume info:', error); // Error handling
        }
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                {/* Form Section */}
                <FormSection />
                {/* Preview Section */}
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default EditResume;
