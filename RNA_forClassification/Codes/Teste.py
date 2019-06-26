# -*- coding: utf-8 -*-
"""
Created on Tue Jun 25 14:57:16 2019

@author: Bianca
"""

from pybrain.tools.customxml.networkreader import NetworkReader
import numpy as np

#Carregar Redes
#RedSoft1 Camada oculta - Linear Camada externa Softmax
#RedSoft2 Camada oculta - Sogmoide Camada externa Softmax
#RedSoft3 Camada oculta - Tangente Hiperbolica Camada externa Softmax
RedeSoft1 = NetworkReader.readFrom('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\SoftMax\Soft1.xml')
RedeSoft2 = NetworkReader.readFrom('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\SoftMax\Soft2.xml')
RedeSoft3 = NetworkReader.readFrom('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\SoftMax\Soft3.xml')

#RedeTan1 Camada oculta - Linear Camada externa Tangente Hiperbolica
#RedeTan2 Camada oculta - Sogmoide Camada externa Tangente Hiperbolica
#RedeTan3 Camada oculta - Tangente Hiperbolica Camada Tangente Hiperbolica
RedeTan1 = NetworkReader.readFrom('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\RTangente\Tan1.xml')
RedeTan2 = NetworkReader.readFrom('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\RTangente\Tan2.xml')
RedeTan3 = NetworkReader.readFrom('C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\RTangente\Tan3.xml')


#Configurar rotulos ds classes e obter matrizes de teste
Labels = ['A','a','E','e','I','i','O','o','U','u']
TestInputs = np.loadtxt("C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\datasetdoprojeto\RNA\DataTest\Rtest.txt", dtype = int, delimiter = ',')
#TestOut = np.genfromtxt("C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\datasetdoprojeto\RNA\DataTest\OutputTests.txt",dtype=str)
#TestOut = np.genfromtxt("C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\datasetdoprojeto\RNA\DataTest\OutputTestsLetras.txt",dtype=str)
TestOut = np.genfromtxt("C:\Users\Bianca\OneDrive\Documentos\Doutorado\AlgoritmosEgrafos\OCR\datasetdoprojeto\RNA\DataTest\OutputTests2.txt",dtype=str)

# Converter caracteres de saida para numeros inteiros com base no indice em labels
TestOutputs = np.empty((1,1), dtype=int)
for i in np.nditer(TestOut):
   TestOutputs = np.append(TestOutputs,np.array([[Labels.index(i)]]),0)
TestOutputs = np.delete(TestOutputs,0,0)

#print(TestOutputs)

#Define Correct para 0 e testa redes com dados de teste
RedeSoft1Correct = 0
RedeSoft2Correct = 0
RedeSoft3Correct = 0


for i in range(len(TestInputs)):
    outputArray = RedeSoft1.activate(TestInputs[i])
    indMax = outputArray.argmax()
    if indMax == TestOutputs[i]:
        RedeSoft1Correct = RedeSoft1Correct+1
        
for i in range(len(TestInputs)):
    outputArray = RedeSoft2.activate(TestInputs[i])
    indMax = outputArray.argmax()
    if indMax == TestOutputs[i]:
        RedeSoft2Correct = RedeSoft2Correct+1

for i in range(len(TestInputs)):
    outputArray = RedeSoft3.activate(TestInputs[i])
    indMax = outputArray.argmax()
    if indMax == TestOutputs[i]:
        RedeSoft3Correct = RedeSoft3Correct+1

RedeTan1Correct = 0
RedeTan2Correct = 0
RedeTan3Correct = 0

for i in range(len(TestInputs)):
    outputArray = RedeTan1.activate(TestInputs[i])
    indMax = outputArray.argmax()
    if indMax == TestOutputs[i]:
        RedeTan1Correct = RedeTan1Correct+1

for i in range(len(TestInputs)):
    outputArray = RedeTan2.activate(TestInputs[i])
    indMax = outputArray.argmax()
    if indMax == TestOutputs[i]:
        RedeTan2Correct = RedeTan2Correct+1

for i in range(len(TestInputs)):
    outputArray = RedeTan3.activate(TestInputs[i])
    indMax = outputArray.argmax()
    if indMax == TestOutputs[i]:
        RedeTan3Correct = RedeTan3Correct+1


print("RedSoft1 Camada oculta Linear Camada externa Softmax - " + str(RedeSoft1Correct))
print("RedSoft2 Camada oculta Sogmoide Camada externa Softmax - " + str(RedeSoft2Correct))
print("RedSoft3 Camada oculta Tangente Hiperbolica Camada externa Softmax - " + str(RedeSoft3Correct))
print("RedeTan1 Camada oculta Linear Camada externa Tangente Hiperbolica - " + str(RedeTan1Correct)) 
print("RedeTan2 Camada oculta Sogmoide Camada externa Tangente Hiperbolica - " + str(RedeTan2Correct))
print("RedeTan3 Camada oculta Tangente Hiperbolica Camada Tangente Hiperbolica - " + str(RedeTan3Correct))