//import { useState } from 'react'
import './App.css'
import OpenAI from "openai";
import {useEffect, useState} from "react";
import fs from "fs";

const client =
    new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

// const prompt = 'A children\'s book drawing of a veterinarian using a stethoscope to \n' +
//     'listen to the heartbeat of a baby otter.';
//
// const result = await client.images.generate({
//     model:"gpt-image-1",
//     prompt,
// });
//
// // Save the image to a file
// const image_base64 = result.data[0].b64_json;
// const image_bytes = Buffer.from(image_base64, "base64");
// fs.writeFileSync("otter.png", image_bytes);

const response = await client.responses.create({
        model: "gpt-4.1",
        input: "Write a one-sentence bedtime story about a unicorn.",
    }
)

console.log(response.output_text);

function InputArea({color, setColor, mood, setMood, product, setProduct}){
    // what's the input?
    // let's do basic image gen
    // color
    // mood -> objects -> images of them in a color palette


    return(
        <>
        <p>Choose your parameters for the moodboard</p>
            <p>current mood: {mood}</p>
            <select onChange={e => setMood(e.target.value)}>
                <option value ="DEFAULT" disabled>mood?</option>
                <option>happy</option>
                <option>sad</option>
                <option>angry</option>
            </select>
            <p>current color: {color}</p>
            <select onChange={e => setColor(e.target.value)}>
                <option value ="DEFAULT" disabled>color?</option>
                <option>red</option>
                <option>blue</option>
                <option>green</option>
            </select>
            <p>current product: {product}</p>
            <select onChange={e => setProduct(e.target.value)}>
                <option value ="DEFAULT" disabled>product?</option>
                <option>shoes</option>
                <option>hat</option>
                <option>television</option>
            </select>
        </>
    )
}

// function getNewPrompt(color, mood, product){
//     console.log("new prompt:" + color + mood + product);
// }

// async function getImage(prompt){
//     const result = await client.images.generate({
//         model:"gpt-image-1",
//         prompt,
//     });
//     return result;
// }

function MoodboardArea({color, mood, product, prompt}){
    return(
        <>
            <p>current color: {color}</p>
            <p>current mood: {mood}</p>
            <p>current product: {product}</p>

            <p>generated prompt: {prompt}</p>

        </>
    )
}

function WholeMoodboard(){
    const [mood, setMood] = useState("happy");
    const [color, setColor] = useState("red");
    const [product, setProduct] = useState("shoes");

    const [prompt, setPrompt] = useState("happy red shoes");

    const getNewPrompt = async () => {
        const response = await client.responses.create({
                model: "gpt-4.1",
                input: "Write a description for an image containing happy red shoes.",
            }
        )

        setPrompt(response.output_text);

        console.log(response.output_text);
    }

    useEffect(() => {
        console.log('${color} ${mood} ${product}');
        getNewPrompt(color, mood, product).then(r => {
            console.log(r);
        });
        // const getNewImage = async () => {
        //     console.log(`New color, mood, product is ${color} ${mood} ${product}`);
        // };
    });


    return (
        <div>
            <InputArea color={color} setColor={setColor} mood={mood} setMood={setMood} product={product} setProduct={setProduct}></InputArea>
            <MoodboardArea color={color} mood={mood} product={product} prompt={prompt}></MoodboardArea>
        </div>
    )
}

export default function App() {

  return (
    <>
      <div>
          <title>AI Moodboard</title>
          <WholeMoodboard></WholeMoodboard>
      </div>
    </>
  )
}

