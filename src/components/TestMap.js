import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

export default function TestMap(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCyClGli0gh0OB5AnwKUpisdiz3PQLUzdg",
    });

    if(!isLoaded) return <div>Loading....</div>;
    return <TMap />
}

function TMap(){
    return <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerStyle={{width: "300px", height: "300px"}}></GoogleMap>
}