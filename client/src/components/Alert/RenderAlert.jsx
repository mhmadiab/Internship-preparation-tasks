import { Alert } from "react-bootstrap"

const RenderAlert = ({variant , text}) => {
  return (
    <Alert variant={variant} className="mt-3 text-center ">
      <Alert.Heading>{text}</Alert.Heading>
    </Alert>
  )
}

export default RenderAlert