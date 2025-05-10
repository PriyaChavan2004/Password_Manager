  <!-- <tbody className='bg-green-300   '>
              {passwordArray.map((item) => {
                // eslint-disable-next-line react/jsx-key
                return <tr>
                  <td
                    className='text-center '>
                    <div className='flex items-center justify-center'>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='cursor-pointer ' onClick={() => { copytext(item.site); }}>
                        <img className='w-4  rounded-full' src="icons/copy2.png" alt="hey" />
                      </div>
                    </div>


                  </td>

                  <td
                    className='text-center '>
                    <div className='flex items-center justify-center'>
                      {item.username}
                      <div className='cursor-pointer ' onClick={() => { copytext(item.username); }}>
                        <img className='w-4  rounded-full' src="icons/copy2.png" alt="hey" />
                      </div>
                    </div>


                  </td>
                  <td
                    className='text-center '>
                    <div className='flex items-center justify-center'>
                      {item.password}
                      <div className='cursor-pointer ' onClick={() => { copytext(item.password); }}>
                        <img className='w-4  rounded-full' src="icons/copy2.png" alt="hey" />
                      </div>
                    </div>
                  </td>
                  <td
                    className=' flex items-center mx-2 justify-between py-1  text-center '>
                    <span> <img className='w-4   ' onClick={() => { editPassword(item.id) }} src="icons/edit.png" /></span>
                    <span><img className='w-4  ' onClick={() => { deletePassword(item.id) }} src="icons/delete.png" /></span>

                  </td>
                </tr>;

              })}

            </tbody> -->