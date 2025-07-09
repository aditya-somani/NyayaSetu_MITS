
const checking=async(req, res) => {
  const token = req.cookies?.accessToken; 
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    res.json("Verified")
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

export default checking