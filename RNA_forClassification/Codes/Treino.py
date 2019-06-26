# -*- coding: utf-8 -*-
"""
Created on Tue Jun 25 14:57:16 2019

@author: Bianca
"""
from pybrain.datasets import ClassificationDataSet
from pybrain.tools.shortcuts import buildNetwork
from pybrain.supervised.trainers import BackpropTrainer
from pybrain.structure.modules import SoftmaxLayer
from pybrain.structure.modules import TanhLayer
from pybrain.structure.modules import SigmoidLayer
from pybrain.structure.modules import LinearLayer
from pybrain.tools.customxml.networkwriter import NetworkWriter
from pybrain.tools.customxml.networkreader import NetworkReader
import numpy as np
import os,sys
import time

#Definir rrotulos de classe e obter matrizes de entrada e caracteres de saida
Labels = ['A','a','E','e','I','i','O','o','U','u']
Inputs = np.loadtxt("C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\datasetdoprojeto\RNA\DataTraining\Rtraining.txt", dtype = int, delimiter = ',')
#Out = np.genfromtxt('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\datasetdoprojeto\RNA\DataTraining\Outputs.txt',dtype=str)
Out = np.genfromtxt('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\datasetdoprojeto\RNA\DataTraining\Outputs2.txt',dtype=str)

#print(Inputs)
#print(Out)

# Converter caracteres de saida para numeros inteiros com base no indice em labels
Outputs = np.empty((1,1), dtype=int)

for i in np.nditer(Out):
   Outputs = np.append(Outputs,np.array([[Labels.index(i)]]),0)
Outputs = np.delete(Outputs,0,0)

print("tamanhoooooooooo")
print(len(Outputs))


# Construir dataset
Dataset = ClassificationDataSet(120,1,nb_classes=len(Labels))
assert(Inputs.shape[0] == Outputs.shape[0])
Dataset.setField('input',Inputs)
Dataset.setField('target',Outputs)
Dataset._convertToOneOfMany()

#Construir e configurar as redes
#RedeSoft1 Camada oculta - Linear Camada externa Softmax
#RedeSoft2 Camada oculta - Sogmoide Camada externa Softmax
#RedeSoft3 Camada oculta - Tangente Hiperbolica Camada externa Softmax
RedeSoft1 = buildNetwork(120,61,len(Labels),bias=True,hiddenclass=LinearLayer, outclass=SoftmaxLayer)
RedeSoft2 = buildNetwork(120,61,len(Labels),bias=True,hiddenclass=SigmoidLayer, outclass=SoftmaxLayer)
RedeSoft3 = buildNetwork(120,61,len(Labels),bias=True,hiddenclass=TanhLayer, outclass=SoftmaxLayer)

#RedeTan1 Camada oculta - Linear Camada externa Tangente Hiperbolica
#RedeTan2 Camada oculta - Sogmoide Camada externa Tangente Hiperbolica
#RedeTan3 Camada oculta - Tangente Hiperbolica Camada Tangente Hiperbolica
RedeTan1 = buildNetwork(120,61,len(Labels),bias=True,hiddenclass=LinearLayer, outclass=TanhLayer)
RedeTan2 = buildNetwork(120,61,len(Labels),bias=True,hiddenclass=SigmoidLayer, outclass=TanhLayer)
RedeTan3 = buildNetwork(120,61,len(Labels),bias=True,hiddenclass=TanhLayer, outclass=TanhLayer)




#treino
redeSoft1Trainer = BackpropTrainer(RedeSoft1,Dataset)
redeSoft2Trainer = BackpropTrainer(RedeSoft2,Dataset)
redeSoft3Trainer = BackpropTrainer(RedeSoft3,Dataset)

redeTan1Trainer = BackpropTrainer(RedeTan1,Dataset)
redeTan2Trainer = BackpropTrainer(RedeTan2,Dataset)
redeTan3Trainer = BackpropTrainer(RedeTan3,Dataset)


# treinar por 20 epocas e armazenar erros
erroRedeSoft1 = np.empty((1,1))
for x in range(20):
    erro = redeSoft1Trainer.train()
    print (erroRedeSoft1)
    erroRedeSoft1 = np.append(erroRedeSoft1,np.array([[erro]]),0)
    
erroRedeSoft2 = np.empty((1,1))
for x in range(20):
    erro = redeSoft2Trainer.train()
    print (erroRedeSoft2)
    erroRedeSoft2 = np.append(erroRedeSoft2,np.array([[erro]]),0)

erroRedeSoft3 = np.empty((1,1))
for x in range(20):
    erro = redeSoft3Trainer.train()
    print (erroRedeSoft3)
    erroRedeSoft3 = np.append(erroRedeSoft3,np.array([[erro]]),0)
    
erroRedeTan1 = np.empty((1,1))
for x in range(20):
    erro = redeTan1Trainer.train()
    print (erroRedeTan1)
    erroRedeTan1 = np.append(erroRedeTan1,np.array([[erro]]),0)
    
erroRedeTan2 = np.empty((1,1))
for x in range(20):
    erro = redeTan2Trainer.train()
    print (erroRedeTan2)
    erroRedeTan2 = np.append(erroRedeTan2,np.array([[erro]]),0)

erroRedeTan3 = np.empty((1,1))
for x in range(20):
    erro = redeTan3Trainer.train()
    print (erroRedeTan3)
    erroRedeTan3 = np.append(erroRedeTan3,np.array([[erro]]),0)


#Salvar
np.savetxt('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\SoftMax\erroRedeSoft1.txt',erroRedeSoft1)
NetworkWriter.writeToFile(RedeSoft1,'C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\SoftMax\Soft1.xml')

np.savetxt('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\SoftMax\erroRedeSoft2.txt',erroRedeSoft2)
NetworkWriter.writeToFile(RedeSoft2,'C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\SoftMax\Soft2.xml')

np.savetxt('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\SoftMax\erroRedeSoft3.txt',erroRedeSoft3)
NetworkWriter.writeToFile(RedeSoft3,'C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\SoftMax\Soft3.xml')

np.savetxt('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\RTangente\erroRedeTan1.txt',erroRedeTan1)
NetworkWriter.writeToFile(RedeTan1,'C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\RTangente\Tan1.xml')

np.savetxt('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\RTangente\erroRedeTan2.txt',erroRedeTan2)
NetworkWriter.writeToFile(RedeTan2,'C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\RTangente\Tan2.xml')

np.savetxt('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\RTangente\erroRedeTan3.txt',erroRedeTan3)
NetworkWriter.writeToFile(RedeTan3,'C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\RTangente\Tan3.xml')





