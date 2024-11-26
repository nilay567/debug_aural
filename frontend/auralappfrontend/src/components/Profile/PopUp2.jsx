import React from 'react'

const PopUp2 = ({followingModal, setfollowingModal, profile, user, setcurProfile, setSearchTerm}) => {
  const following = user?.following;
  //console.log('following: ',following)
  const getUsernameById = (userId) => {
    const users = profile.find(u => u?._id?.$oid === userId);
    return users ? users?.username : 'User not found';
  };
  const getUserById = (userId) => {
    const users = profile.find(u => u?._id?.$oid === userId);
    return users ? users : null;
  };
  return (
    <>
      {followingModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none"
          >
            <div className="relative  w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Following
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setfollowingModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                
                {following.map((foll)=> <div className='flex relative flex-col z-[100] overflow-auto'>
                  <button className=' border-x-0 border-y-2 border-grey ' type='submit' onClick={()=>{
                    setfollowingModal(false)
                    setSearchTerm('')
                    setcurProfile(getUserById(foll))
                    }}> {getUsernameById(foll)} </button>
                 
                  
            </div>
                )

            }
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>setfollowingModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>setfollowingModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default PopUp2
