import { BoltIcon } from '@heroicons/react/20/solid'
import { SunIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'


export default function Home() {
  return (
    <div className="text-white flex flex-col items-center justify-center h-screen">
      {/* heading  */}
      <h1 className="text-5xl font-bold mb-20">Dialogix Engine</h1>

      {/* below heading */}
      <div className='flex space-x-2 text-center'>

        {/* first box */}
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <SunIcon className='h-8 w-8' />
            <h2>Example</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">&quot;Explain something to me&quot;</p>
            <p className="infoText">&quot;What is the difference between a dog and a cat?&quot;</p>
            <p className="infoText">&quot;What is the color of the sun?&quot;</p>
          </div>
        </div>

        {/* second box */}
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <BoltIcon className='h-8 w-8' />
            <h2>Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">Change the ChatGPT Model to use</p>
            <p className="infoText">Message are stored in Firebase&apos;s Firestore</p>
            <p className="infoText">Hot Toast notification when ChatGPT is thinking!</p>
          </div>
        </div>

        {/* third box */}
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <ExclamationTriangleIcon className='h-8 w-8' />
            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">May occasionally generate incorrect information</p>
            <p className="infoText">May occasionally produce harmful instruction or biased content</p>
            <p className="infoText">Limited knowledge of world and events after 2021</p>
          </div>
        </div>
      </div>

    </div>
  )
}
