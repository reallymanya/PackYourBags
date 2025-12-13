import {useEffect, useState} from 'react'

const useFetch = (url) => {
    
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData =  async()=>{
            setLoading(true)
             
            try {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/15864046-1065-405a-b3f3-cb0d8581d3cd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFetch.js:14',message:'Fetching from URL',data:{url:url},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                const res = await fetch(url)
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/15864046-1065-405a-b3f3-cb0d8581d3cd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFetch.js:16',message:'Fetch response received',data:{ok:res.ok,status:res.status,statusText:res.statusText,url:url},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
                // #endregion

                if(!res.ok){
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/15864046-1065-405a-b3f3-cb0d8581d3cd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFetch.js:19',message:'Response not OK',data:{status:res.status,statusText:res.statusText,url:url},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
                    // #endregion
                    setError('failed to fetch')
                    alert('failed to fetch')
                    
                }
                const result = await res.json()
                setData(result.data)
                setLoading(false)
                
            } catch (err) {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/15864046-1065-405a-b3f3-cb0d8581d3cd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFetch.js:28',message:'Fetch error caught',data:{errorName:err.name,errorMessage:err.message,errorStack:err.stack,url:url},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})}).catch(()=>{});
                // #endregion

                setError(err.message)
                setLoading(false)
                
            }

            
        };

        fetchData();
    },[url])


    

  return{
    data, error,loading
  }
}

export default useFetch