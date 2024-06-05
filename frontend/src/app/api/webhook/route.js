
export async function POST(request) {
    try {
      if (request.method === "POST") {
        const { destination, location } = await request.json();
        console.log(destination, location);
  
        return Response.json({ message: [destination, location] });
      }
  
      return Response.json({ message: "Not Found" });
    } catch (err) {
      return Response.json({ message: "Internal Server Error" });
    }
  }

  export async function GET(request) {
    try {
      if (request.method === "GET") {
        return Response.json({ message: "Hello" });
      }
  
      return Response.json({ message: "Not Found" });
    } catch (err) {
      return Response.json({ message: "Internal Server Error" });
    }
  }

