import Card from "antd/es/card/Card";

const ResponsiveCard = ({ children }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-4xl p-6 ">
        {children}
      </Card>
    </div>
    </div>
  );
};

export default ResponsiveCard;
