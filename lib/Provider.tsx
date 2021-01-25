import * as React from "react"
import { View } from "react-native"
import Sugar from "./Sugar"

export const SugarProvider: React.FC<{
    sugar: Sugar<any>
    children: React.ReactNode | React.ReactNode[]   
}> = ({
    sugar,
    children
}) => {
    const [count, render] = React.useState(1)

    React.useEffect(() => {
        sugar.subscribe("build", () => {
            render(c => c + 1)
        })
    }, [])

    return (
        <View key={count} style={{ flex: 1 }}>
            {children}
        </View>
    )
}
