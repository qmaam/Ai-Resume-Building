import React, { useEffect, useState, useCallback } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() { 
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = useCallback(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GlobalApi.GetUserResumes(user.primaryEmailAddress.emailAddress)
        .then(resp => {
          console.log(resp.data.data);
          setResumeList(resp.data.data);
        })
        .catch(error => {
          console.error('Error fetching resumes:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user, GetResumesList]);

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume for your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume />
        {resumeList.length > 0 ? resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        )) : 
        [1, 2, 3, 4].map((_item, _index) => (
          <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse' key={_index}></div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;
