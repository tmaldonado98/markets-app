import '../styles/globals.css'
export default function Page() {
    const dateObj = new Date();
    
    const dayOfMonth: number = dateObj.getDate();

    const dayOfWeek: string = dateObj.toLocaleString('en-US', { weekday: 'long' })
    // .getDay();
    const month: string = dateObj.toLocaleString('en-US', { month: 'long' })
    // .getMonth();

//     const options = { weekday: 'long' };
// const dayOfWeek = date.toLocaleString('en-US', options);
  return (
    <main className='min-h-screen'>
        <head>
          <title>Markets App</title>
        </head>

        <h1>Hello, Next.js!</h1>
        <div>
            <p>Recently viewed tickers</p>
            <p>Markets news</p>
            <p>Latest Trends</p>
            <p>Todays date: {dayOfWeek} {month} {dayOfMonth}, {dateObj.getFullYear()}</p>

        </div>
    </main>
  
  );
}